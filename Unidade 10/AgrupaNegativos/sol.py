#Leonardo Su 17:00 16/10/2019

def agrupa_negativos(lista):
	di = {'nao-negativos' : [] ,'negativos' : [] }
	for e in lista:
		if e >= 0:
			di['nao-negativos'].append(e)
		if e < 0:
			di['negativos'].append(e)
	return di

# print(agrupa_negativos([10, -2, -7, 8,0]))

assert agrupa_negativos([10, -2, -7, 8]) == {"nao-negativos":[10, 8], "negativos":[-2,-7]}
assert agrupa_negativos([-1, -5]) == {"nao-negativos":[ ], "negativos":[-1, -5]}
