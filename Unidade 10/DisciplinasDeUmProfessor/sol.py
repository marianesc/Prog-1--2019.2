def find(lista,x):
	for e in lista:
		if x == e:
			return True			
	return False


def disciplinas(alocacao, professor):

	materia = []
	C = 0
	
	for e in alocacao.keys():
		for X in alocacao[e]:
			if X == professor:
				C+= e[1]
				if not find(materia,e[0]):
					materia.append(e[0])
	# print((materia,C))
	return (materia,C)

alocacao = {("P1", 4): ['Jorge', 'Dalton','Wilkerson'],
         ("LP1", 4): ['Jorge', 'Dalton', 'Eliane', 'Wilkerson'],
         ("EVOL", 2): ['Dalton'],
         ("IC", 4): ['Eliane', 'Joseana'],
         ("P2", 4): ['Livia', 'Raquel', 'Nazareno'],
         ("GRAFOS", 2): ['Patricia', 'Patricia']}

assert set(disciplinas(alocacao, "Dalton")[0]) == set(['P1', 'LP1', 'EVOL'])

assert disciplinas(alocacao, "Dalton")[1] == 10
assert set(disciplinas(alocacao, "Eliane")[0]) == set(['LP1', 'IC'])
assert disciplinas(alocacao, "Eliane")[1] == 8
assert set(disciplinas(alocacao, "Patricia")[0]) == set(['GRAFOS'])
assert disciplinas(alocacao, "Patricia")[1] == 4