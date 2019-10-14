# UFCG
# Prog1
# Juan Salvador - 119210821
# Segundo/buuble sorte


def ordenacao(lst):

    for final in range(len(lst), 0, -1):
        troca = False

        for current in range(0, final - 1):
            if lst[current] > lst[current + 1]:
                lst[current + 1], lst[current] = lst[current], lst[current + 1]
                troca = True

        if not troca:
            break


num = list()
aux = list()

for c in range(0, 4):
	num.append(int(input()))
	aux.append(num[c])

ordenacao(num)

print('''Considerando os números {}, {}, {} e {}
O segundo menor número é {}
O segundo maior número é {}
'''.format(aux[0], aux[1], aux[2], aux[3], num[1], num[2]), end='')
