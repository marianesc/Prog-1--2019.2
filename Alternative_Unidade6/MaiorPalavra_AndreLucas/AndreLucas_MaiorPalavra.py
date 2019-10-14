# UFCG - Programação 1 - 2019.2
# André Lucas Medeiros Martins - 119210592
# Maior Palavra em uma Frase

def maior_palavra(frase):
    maior = ''
    palavra = ''

    for caracter in frase:
        if caracter != ' ':
            palavra += caracter
        
        else:
            if len(palavra) >= len(maior):
                maior = palavra
            palavra = ''
    if palavra != '':
        if len(palavra) >= len(maior):
            maior = palavra

    return maior

#print(maior_palavra(input()))
