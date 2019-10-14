#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Cadastro Nacional de Pessoa Jurídica - CNPJ

raiz = input()

a1 = int(raiz[0])
a2 = int(raiz[1])
b1 = int(raiz[3])
b2 = int(raiz[4])
b3 = int(raiz[5])
c1 = int(raiz[7])
c2 = int(raiz[8])
c3 = int(raiz[9])

soma = a1+a2+b1+b2+b3+c1+c2+c3+0+0+0+1
ssoma = str(soma)
print("{0}/0001-{1:02}".format(raiz,soma))

