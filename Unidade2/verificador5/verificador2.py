#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Dígito Verificador de 5 Dígitos

nconta = input()

digito1 = int(nconta[0])
digito2 = int(nconta[1])
digito3 = int(nconta[2])
digito4 = int(nconta[3])
digito5 = int(nconta[4])

soma = digito1+digito2+digito3+digito4+digito5

verificador = soma%11

print('{}-{:02}'.format(nconta,verificador))
#print('{nconta}-{1:02}'.format(nconta,verificador))
