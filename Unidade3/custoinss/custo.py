#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Custo INSS

salario = float(input())

inss12 = salario*0.12

if salario <= 1317.07:
    print("O valor da contribuição do INSS a ser pago pelo empregador é de R$ {0:.2f}".format(inss12))
    print("O valor da contribuição do INSS a ser pago pelo empregado é de R$ {0:.2f}".format(salario*0.08))
elif salario > 1317.07 and salario <= 2195.12:
    print("O valor da contribuição do INSS a ser pago pelo empregador é de R$ {0:.2f}".format(inss12))
    print("O valor da contribuição do INSS a ser pago pelo empregado é de R$ {0:.2f}".format(salario*0.09))
else:
    print("O valor da contribuição do INSS a ser pago pelo empregador é de R$ {0:.2f}".format(inss12))
    print("O valor da contribuição do INSS a ser pago pelo empregado é de R$ {0:.2f}".format(salario*0.11))
