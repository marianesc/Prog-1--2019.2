class QuizShortAnswer extends HTMLElement {
    constructor() {
        super();

        // elements
        this.$root = this.attachShadow({"mode": "open"});
        this.$text = null; 
        this.$input = null;
        this.$feedback = null;

        // data
        this._value = null;
        this._text = null;
        this._feedback = null;
        this._original_value = null;
        this._original_feedback = null;
    }

    connectedCallback() {
        // add html to element root
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: grid;
                    border: 0px dashed red;
                }

                code {
                    background: #e2f2f2;
                    font-family: Consolas, monaco;
                    font-size: 14px;
                    color: #244dd0;
                }

                pre {
                    background: #e2f2f2;
                    padding: 12px;
                    margin: 0;
                }
                
                input {
                    padding: 4px; 
                    font-family: Consolas, monaco;
                    color: gray;
                    outline-width: 0;
                    font-size: 14px;
                }
            </style>
            <div id="text">${this.text}</div>
            <input type="text" value="${this.value}">
            <div id="feedback"></div>
        `; 

        // keep important elements
        this.$text = this.shadowRoot.querySelector("#text");
        this.$input = this.shadowRoot.querySelector("input");
        this.$feedback = this.shadowRoot.querySelector("#feedback");

        // keep original values
        this._original_value = this.getAttribute('value');
        this._original_feedback = this.getAttribute('feedback');

        // add event listeners
        this.$input.onkeyup = () => {
            if (this.value === this.$input.value) {
                return;
            }
            this.value = this.$input.value;
            this.dispatchEvent(new Event('change'));
        };

        this.render();
    }

    // renderer (update element)
    render() {
        if (this.$text !== null) {
            this.$text.innerHTML = this.text;
        }
        if (this.$input !== null) {
            this.$input.value = this.value;
        }
        if (this.$feedback !== null) {
            if (this._feedback === '.') {
                this.$feedback.innerHTML = 'Resposta correta ✓';
            }
            else if (this._feedback === '' || this._feedback === ' ') {
                this.$feedback.innerHTML = '';
            }
            else {
                this.$feedback.innerHTML = 'Resposta errada ✗';
            }
        }
    }

    // Attributes
    get text() { 
        return this._text;
    }

    set text(new_text) {
        this._text = new_text;
        this.setAttribute('text', new_text);
        this.render();
    }

    get value() { 
        return this._value;
    }

    set value(new_value) {
        if (!new_value && !this.value) return;
        this._value = new_value;
        this.setAttribute('value', new_value);
        this.render();
    }

    get feedback() {
        return this._feedback;
    }

    set feedback(new_feedback) {
        if (!new_feedback && this._value === this._original_value) {
            console.log('reseting feedback to original!');
            this._feedback = this._original_feedback;
        }

        console.log('redefining feedback!');
        this._feedback = new_feedback;
        this.render();
    }

    static get observedAttributes() {
        return ['value', 'text', 'feedback'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'value' && newValue !== oldValue) {
            this.value = newValue;
        } else if (name === 'text' && newValue !== oldValue) {
            this.text = newValue;
        } else if (name === 'feedback' && newValue !== oldValue) {
            this.feedback = newValue;
        }
    }
}

customElements.define('qz-short', QuizShortAnswer);
