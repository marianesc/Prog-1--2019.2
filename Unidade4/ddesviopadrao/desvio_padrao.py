lista = []

for k in range(2):
    contador = 0
    soma = 0
    seq = input().split()
    for i in range(len(seq)):
        contador += float(seq[i])
    media = contador / len(seq)
    for i in range(len(seq)):
        soma += (float(seq[i]) - media) ** 2
    desvio = (soma / (len(seq) - 1)) ** 0.5
    lista.append(str(desvio))

if float(lista[0]) > float(lista[1]):
    print('A sequência 1 possui o maior desvio padrão ({:.2f}).'.format(float(lista[0])))
elif float(lista[0]) == float(lista[1]):
    print('As sequências possuem o mesmo desvio padrão ({:.2f}).'.format(float(lista[0])))
else:
    print('A sequência 2 possui o maior desvio padrão ({:.2f}).'.format(float(lista[1])))
