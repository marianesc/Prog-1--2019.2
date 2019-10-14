#Ufcg
#Programação 1 - 2019
#Juan Salvador da Silva- 119210821
#Novo CPF

parte1 = input()
parte2 = input()
parte3 = input()

digito1 = int(parte3[0])
digito2 = int(parte3[1])
digito3 = int(parte3[2])

parte4 = digito1+digito2+digito3

print ("{0}.{1}.{2}-{3:02}".format(parte1, parte2, parte3, parte4))
