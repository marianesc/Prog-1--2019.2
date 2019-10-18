#Leonardo Su 00:40 17/10/2019

def find(x,dic):
	for e in dic.keys():
		if e == x:
			return True
	return False

def troca_chave(dic):
	
	novo = {}
	for key,value in dic.items():
		if not find(value,novo):
			novo[value] = key
		else:
			novo[value].append(key)
	return novo
  

assert troca_chave({1:2}) == {2:1}
assert troca_chave({1:2, 2:3, 3:4}) == {2:1, 3:2, 4:3}
assert troca_chave({ '@':'V','a':'v', 'n':'o'}) == { 'V':'@','v':'a', 'o':'n'}
