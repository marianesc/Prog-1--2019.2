// Group
function Group(raw_object) {
    _.extend(this, raw_object);
    //this.students.sort();
    //for (i in this.students) {
    //    this.students[i] = {email: this.students[i]};
    //}
}

// Challenge
function Challenge(raw_object) {
    //_.extend(this, raw_object);
    Object.assign(this, raw_object);
    Object.defineProperties(this, {
        'date': {
            get: function() {
                if (typeof this.start_datetime !== 'undefined') {
                    return this.start_datetime.split("T")[0];
                }
                return this.start_at.split("T")[0];
            },
            set: function (value) {
                this.start_datetime = value + "T" + this.start_datetime.split("T")[1];
                this.end_datetime = value + "T" + this.end_datetime.split("T")[1];
            }
        },
        'start_time': {
            get: function() {
                return this.start_datetime.split("T")[1];
            }
        },
        'state': {
            get: function state() {
                var now = new Date();
                var open = new Date(this.open_datetime);
                var start = new Date(this.start_datetime);
                var end = new Date(this.end_datetime);
                var close = new Date(this.close_datetime);

                if (now > close) {
                    return 'closed';
                }
                else if (now > end) {
                    return 'ended';
                }
                else if (now > start) {
                    return 'running';
                }
                else if (now > open) {
                    return 'open';
                }
                return 'planned';
            }
        },
        'end_time': {
            get: function() {
                return this.end_datetime.split("T")[1];
            },
            set: function (value) {
                this.end_datetime = this.end_datetime.split("T")[0] + "T" + value;
            }
        }
    });
}


// Activity
function Activity(data) {
    this.changed = [];
    _.extend(this, data);
}

Activity.prototype.patch_diff = function (other) {
    var properties = ['text', '']
    for (var prop in properties) {
        
    }
}

Activity.prototype.copy = function () {
    return new Activity(this);
}

Activity.prototype.delete_test = function(index) {
    this.tests[index].deleted = true;
}

Activity.prototype.add_test = function() {
    this.tests.push({
        category: 'secret',
        input: '',
        output: '',
        type: 'io',
        name: 'unnamed'
    })
}

Activity.prototype.add_file = function() {
    var name = 'new_file_' + Math.floor(1000000 * Math.random());
    this.files[name] = {
        category: 'secret',
        data: ''
    }
}


Activity.prototype.get_test_object = function(index) {
    var obj = {};
    var test = this.tests[index]
    obj.category = test.category || "secret";
    obj.type = test.type || "io";
    obj.name = test.name || "";
    if (_.has(test, 'input')) {
        obj.input = test.input;
    }
    if (_.has(test, 'output')) {
        obj.output = test.output;
    }
    return obj;
}

// Student
function Student(raw_object) {
    _.extend(this, raw_object);
    Object.defineProperties(this, {
        'current_unit': {
            get: function() {
                if (!this.current_group) {
                    return undefined;
                }
                return this.groups[this.current_group].current_unit || undefined;
            }
        },
        'progress': {
            get: function() {
                if (!this.current_group) {
                    console.error('Student sem current_group: ' + this.email);
                    return undefined;
                }
                return this.groups[this.current_group] || undefined;
            }
        }
    });
}

Student.prototype.units = function units() {
    return [];
    //const units = this.groups[this.current_group]['units'];
    //Object.keys(units).forEach(function (k) {
    //    units[k].key = k;
    //});
    //let units_list = Object.keys(units)
    //                 .map(ukey => units[ukey])
    //                 .filter(e => e instanceof Object);
    //units_list.sort((a,b) => a.index - b.index);
    //return units_list;
}

Student.prototype.closed = function closed(unit) {
    var closed =  _.filter(this.assignments, a => a.state === 'closed' && a.unit === unit && a.group === this.current_group && !a.mode);
    return closed.length;
}

Student.prototype.num_mts = function num_mts(unit) {
    var unit = this.groups[this.current_group].units[unit.name];
    if (typeof unit === 'undefined') {
        return 0
    }
    return unit.mtp || 0;
}

Student.prototype.unit_state = function unit_state(unit) {
    if (typeof this.progress === 'undefined') {
        return 'locked';
    }
    var unit = this.progress.units[unit.name || unit];
    if (typeof unit == 'undefined') {
        return 'locked';
    }
    return unit.state || 'locked';
}

Student.prototype.url = function url() {
    return api_url + '/user/' + this.email;
}

Student.prototype.toggle_unit = function toggle_unit(unit) {
    var current = this.progress.units[unit].state;
    this.progress.units[unit].state = current === 'locked' ? 'unlocked' : 'locked';
}

Student.prototype.deprecated_toggle_unit = function toggle_unit(unit) {
    if (this.unlocked_units === 'undefined') {
        return;
    }

    if (this.unlocked_units.indexOf(unit) < 0) {
        this.unlocked_units.push(unit);
        this.unlocked[unit] = true;
        return;
    } else {
        this.unlocked_units = _.filter(this.unlocked_units, e => e !== unit)
        this.unlocked[unit] = false;
    }
}

Student.prototype.unit_status = function unit_status(unit) {
    if (typeof this.unlocked_units === 'undefined') {
        return undefined;
    }

    if (this.current_unit === unit) {
        return this.unlocked_units.indexOf(unit) < 0 ? 'locked-current' : 'unlocked-current';
    }

    return this.unlocked_units.indexOf(unit) < 0 ? 'locked' : 'unlocked';
}

Student.prototype.xp = function xp(groupname) {
    if (typeof this.groups === 'undefined')
        return 0;

    return this.groups[groupname].xp || 0;
}

Student.prototype.current_unit_DEPRECATED = function (groupname) {
    //groupname = groupname || this.current_group;
    if (typeof groupname === 'undefined')
        return undefined;

    if (typeof this.groups === 'undefined')
        return undefined;

    if (typeof this.groups[groupname] === 'undefined')
        return undefined;

    return this.groups[groupname].current_unit || undefined;
}

Student.prototype.online = function (groupname) {
    if (typeof this.is_online != 'undefined')
        return this.is_online;

    this.is_online = Math.random() > 0.7;
    return this.is_online;
}


// Assignment Constructor
function Assignment(raw_object) {
    _.extend(this, raw_object)

    if (this.activity && this.activity.text.trim().slice(0,2) != "# ")
        this.activity.text = "# " + this.activity.label + "\n" + this.activity.text;

    Object.defineProperties(this, {
        'is_problem': {
            get: function() {
                return this.activity.type == 'problem'
            }
        },
        'checkout_key': {
            get: function() { return this.quizzes.__program ? this.name : undefined; }
        }
    });
}

Assignment.prototype.type = function type() {
    if (this.activity && this.activity.type)
        return this.activity.type;

    if (this.is_problem)
        return 'problem';

    return 'lesson';
}

Assignment.prototype.submit_days = function submit_days() {
    return _.uniq(_.map(_.keys(this.results), day => day.split("T")[0])).sort()
}

Assignment.prototype.OLD_is_problem = function OLD_is_problem() {
    return !!(this.quizzes && '__program' in this.quizzes)
}

Assignment.prototype.last_summary = function last_summary() {
    if ('results' in this) 
        return this.last_summary_old();

    // assumindo api=v2
    if (!('answers' in this)) 
        return undefined;

    return this.answers[this.answers.length - 1]['__summary'];
    
}

Assignment.prototype.last_summary_old = function last_summary_old() {
    if (!this.results) {
        return this.last_results && this.last_results.summary;
    }

    var timestamps = Object.keys(this.results);
    var most_recent = _.reduce(timestamps, function(t1, t2) {
        return t1 > t2 ? t1 : t2;
    })

    var recent_results = this.results[most_recent];
    if (!recent_results) {
       return undefined; 
    }

    if (typeof recent_results === "object" && "summary" in recent_results) {
        recent_results = recent_results['summary'] || ""
        return recent_results;
    }

    return undefined; 
}

Assignment.prototype.open_Date = function open_Date() {
    if (!this.open_datetime) {
        return ""
    }
    if (this._open_Date === undefined)
        this._open_Date = new Date(this.open_datetime);

    return this._open_Date;
}

Assignment.prototype.create_Date = function create_Date() {
    if (!this.create_datetime) {
        return ""
    }
    if (this._create_Date === undefined)
        this._create_Date = new Date(this.create_datetime);

    return this._create_Date;
}

Assignment.prototype.close_Date = function close_Date() {
    if (!this.close_datetime) {
        return ""
    }
    if (this._close_Date === undefined)
        this._close_Date = new Date(this.close_datetime);

    return this._close_Date;
}

// TODO: unify these two methods
Assignment.prototype.verdict = function verdict() {
    var summary = this.last_summary()
    if (!summary)
        return undefined
    return _.every(summary, function(c) {return c === "."}) ? "success" : "fail"
}

Assignment.prototype.verdict2 = function verdict2(answer_timestamp) {
    let summary;
    if ('results' in this) {
        summary = this.results[answer_timestamp].summary;
    } else {
        summary = this.answers.find(a => a['__timestamp'] === answer_timestamp).__summary;
    }
    if (!summary)
        return undefined;

    return _.every(summary, function(c) {return c === "."}) ? "success" : "fail"
}

Assignment.prototype.verdict_answer = function (index) {
    return this.verdict2(this.answers[index]['__timestamp']) === "success" ? "👍" : "👎";
}
