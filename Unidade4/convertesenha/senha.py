#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Criptografando uma Senha

palavra = input()

palavra_aux = ''
letra_aux = ''
c=0
i = 0

for letra in palavra:
    letra_aux = letra

    if i != 0:
        if letra == 'a' or letra == 'A':
            letra_aux = '4'
            c+=1
        elif letra == 'e' or letra == 'E':
            letra_aux = '3'
            c+=1
        elif letra == 'i' or letra == 'I':
            letra_aux = '1'
            c+=1
        elif letra == 'o' or letra == 'O':
            letra_aux = '0'
            c+=1
    i+=1
    palavra_aux += letra_aux

print('{} ({} troca(s))' .format(palavra_aux, c))
