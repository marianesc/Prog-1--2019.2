# UFCG - Programação 1 - 2019.2
# André Lucas Medeiros Martins - 119210592
# Tradutor Morse

def buscar_indice_lista(item, lista):
    for indice in  range(len(lista)):
        if lista[indice] == item:
            return indice

def tradutor_morse(codigo):
    letras = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    morse = ['.-','-...','-.-.','-..','.','..-.','--.','....','..','.---','-.-','.-..','--','-.','---','.--.','--.-','.-.','...','-','..-','...-','.--','-..-','-.--','--..']
    
    palavra = ''

    for serie in codigo:
        palavra += letras[buscar_indice_lista(serie, morse)]

    return palavra

print(tradutor_morse(input().split()))

