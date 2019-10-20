#Leonardo Su 00:42 17/10/2019

def quantidade_usuarios(cadastro):
	pessoas = []

	for e in cadastro.keys():
		if e != 9999:
			for j in cadastro[e]:
				pessoas.append(j)
	return len(pessoas)


lsd = {1234:['Andrey'], 1226:['Nazareno', 'Livia'], 9999:['administrador'] }
deq = {1114:['Ana'] }

assert quantidade_usuarios(lsd) == 3
assert quantidade_usuarios(deq) == 1