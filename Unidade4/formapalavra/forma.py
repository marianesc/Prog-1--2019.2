#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Forma Palavra a partir de Outras 3 Palavras

palavra1 = input()
palavra2 = input()
palavra3 = input()
palavrao = ''


for letra in range(len(palavra1)):
    if palavra1[letra] >= palavra2[letra] and palavra2[letra] >= palavra3[letra]:
        palavrao += palavra1[letra]
    elif palavra1[letra] >= palavra3[letra] and palavra3[letra] >= palavra2[letra]:
        palavrao += palavra1[letra]
    elif palavra2[letra] >= palavra1[letra] and palavra1[letra] >= palavra3[letra]:
       palavrao += palavra2[letra]
    elif palavra2[letra] >= palavra3[letra] and palavra3[letra] >= palavra1[letra]:
       palavrao += palavra2[letra]
    elif palavra3[letra] >= palavra1[letra] and palavra1[letra] >= palavra2[letra]:
       palavrao += palavra3[letra]
    elif palavra3[letra] >= palavra2[letra] and palavra2[letra] >= palavra1[letra]:
       palavrao += palavra3[letra]

print(palavrao)
