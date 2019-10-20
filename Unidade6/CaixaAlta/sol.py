##Leonardo Su, Github : @Leonardosu

def caixa_alta(frase):
	flag = True
	ans = ""
	frase+=' '

	for i in range(len(frase) - 1):
		if(frase[i] == ' '):
			flag = True
			ans+=frase[i]
		else:
			if(frase[i+1] == ' ' and flag):
				ans+=frase[i].lower()
			elif flag:
				ans+=frase[i].upper()
			else:
				ans+=frase[i]		
			flag = False
	return ans

assert (caixa_alta("A primeira letra de cada palavra") 
			 	== "a Primeira Letra De Cada Palavra")
