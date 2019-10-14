#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Acima da média (Criminalidade)

#entrada
mediamensal = float(input())
ndnv = ''

#laço
while True:
    n = input()
    nf = n.split()
#quebra
    if nf[0] == 'fim':
        break

    numeros = 0
    for i in range(len(nf)):
        numeros += float((nf[i]))
    
    media = numeros/len(nf)
#quebra
    if (media*2) < mediamensal:
        break
    if media>mediamensal:
        ndv = n
        print(ndv)
