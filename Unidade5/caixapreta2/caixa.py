#ufcg
#juan silva - 119210821
#caixa preta versão2 while

p = 0
c = 0
a = 0
while True:
    peso,combustivel,altitude = [int(num) for num in input().split()]
    if peso >= 0:
        p += 1
    elif peso < 0:
        print('dado inconsistente. peso negativo.')
        break
    if combustivel >= 0:
        c += 1
    elif combustivel < 0:
        print('dado inconsistente. combustível negativo.')
        break
    if altitude >= 0:
        a += 1
    elif altitude < 0:
        print('dado inconsistente. altitude negativa.')
        break
print('peso: {}'.format(p))
print('combustível: {}'.format(c))
print('altitude: {}'.format(a))
