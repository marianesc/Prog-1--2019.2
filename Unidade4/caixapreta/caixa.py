n = int(input())
contador = 0
sinalizador = True

for i in range(n):
    dado = input().split()
    for e in range(len(dado)):
        if sinalizador == False:
            break
        elif int(dado[e]) >= 0:
            contador += 1
        else:
            sinalizador = False
            if int(dado[0]) < 0:
                print('dado inconsistente. peso negativo.')
            elif int(dado[1]) < 0:
                print('dado inconsistente. combustível negativo.')
            elif int(dado[2]) < 0:
                print('dado inconsistente. altitude negativa.')
        
print('{} dados válidos.'.format(contador))
