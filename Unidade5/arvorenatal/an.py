linha  = int(input())
folha = linha * 2 - 1
espacos = (folha - 1)/2
pace = ' '
ol = 'o'
for i in range(linha):
    print(' '*(espacos-i+1)+'o'*(2*i-1))

#incompleta

