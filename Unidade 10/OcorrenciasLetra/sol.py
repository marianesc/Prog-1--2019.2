#Leonardo Su 00:30 17/10/2019


entrada = input()

dic = dict()

for e in entrada:
	if e != ' ':
		x = e.lower()
		dic[x] = 0

for e in entrada:
	if e != ' ':
		x = e.lower()
		dic[x] += 1

maior = 0
letra = 'a'

for e in dic.keys():
	if dic[e] > maior:
		maior = dic[e]
		letra = e

print(letra,maior)
