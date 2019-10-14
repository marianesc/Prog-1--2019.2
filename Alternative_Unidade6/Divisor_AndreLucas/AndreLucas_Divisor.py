# UFCG - Programação 1 - 2019.2
# André Lucas Medeiros Martins - 119210592
# Divisor

def divisor(num, lista):
    indice = ''
    for i in range(len(lista)):
        if lista[i]%num == 0:
            indice = i
            break
    if indice == '':
        indice = -1

    return indice

#print(divisor(int(input('divisor: ')),list(map(int,input('lista: ').split()))))
