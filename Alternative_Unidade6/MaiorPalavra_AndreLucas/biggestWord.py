def biggestWord(phrase,  bigger = ""):
    phrase = phrase.split()
    for v in phrase: 
        if len(v) > len(bigger): bigger = v
    return bigger

assert biggestWord("eu acredito que seja um bom exemplo") == "acredito"