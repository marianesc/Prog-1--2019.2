#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Lei Estadual de Incentivo Cultural

idade = int(input('Idade? '))


if idade >=65:
    print("idoso (meia entrada)")
elif idade < 12:
    print("criança (meia entrada)")
else:
    estudante = input("Estudante? ")
    if estudante == 's':
        publica = input("Rede Pública? ")
        if publica == 's':
            print("estudante da rede pública (isento)")
        else:
            print("estudante (meia entrada)")
    else:
        print("adulto (inteira)")
