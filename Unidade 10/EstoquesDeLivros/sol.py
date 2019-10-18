def ausentes(estoque):
	books = []
	qnt = 0

	for e in estoque.keys():
		if estoque[e] == 0:
			qnt+=1

	return qnt

livros = { "Metamorfose": 30, "O Principe": 0, "Vigiar e Punir": 0, "Dumbo": 22}
assert ausentes(livros) == 2