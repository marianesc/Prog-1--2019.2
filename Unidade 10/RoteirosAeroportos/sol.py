#Leonardo Su 17:07 16/10/2019

def find(nomes): #Pegar os nomes das Cidades
	output = []
	atual = ""
	for e in nomes:
		if e == '/':
			output.append(atual)
			atual = ""
		else:
			atual+=e
	output.append(atual)
	return output

def eh_roteiro(iata, voos, cidades): #Solve
	local = find(cidades)
	for i in range(len(local)-1):
		atual = local[i]
		destino = local[i+1]

		codigo1 = iata[atual]
		codigo2 = iata[destino]
		existe = False

		for x in voos[codigo1]:
			if x == codigo2:
				existe = True
				break
		if not existe:
			return False

	return True

voos = {"CPV": ["REC", "SSA"],
       "REC": ["CPV", "BSB", "GRU", "GIG"],
       "SSA": ["REC", "GRU", "GIG"],
       "BSB": ["CPV", "GIG", "GRU"],
       "GRU": ["GIG", "BSB"],
       "GIG": ["GRU", "REC"]}

iata = {"Campina Grande": "CPV",
       "Recife": "REC",
       "Salvador": "SSA",
       "Brasilia": "BSB",
       "Sao Paulo": "GRU",
       "Rio de Janeiro": "GIG"}




assert eh_roteiro(iata, voos, "Campina Grande/Recife/Rio de Janeiro")
assert eh_roteiro(iata, voos, "Sao Paulo/Rio de Janeiro/Recife/Brasilia")
assert not eh_roteiro(iata, voos, "Recife/Rio de Janeiro/Salvador/Recife")