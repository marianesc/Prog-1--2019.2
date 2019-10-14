#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Custo Empregado

salario_base = float(input())
dias_trabalho = int(input())
custodiario_transporte = float(input())

customensal_transporte = custodiario_transporte * dias_trabalho
fgts = salario_base *0.08
inss_empregador = salario_base * 0.12
customensal_transporte_empregado = customensal_transporte_empregador = 0

if customensal_transporte > (salario_base * 0.06):
    customensal_transporte_empregado = (salario_base * 0.06)
    customensal_transporte_empregador = customensal_transporte - customensal_transporte_empregado

if salario_base <= 1317.07:
    inss_empregado = salario_base * 0.08
elif salario_base<=2195.12:
    inss_empregado = salario_base * 0.09
else:
    inss_empregado = salario_base * 0.11

salario_liquido =  salario_base -(customensal_transporte_empregado + inss_empregado)
custo_empregador = salario_base + customensal_transporte_empregador + fgts + inss_empregador

print("O salário base é R$ {0:.2f}".format(salario_base))
print("O custo mensal para o empregador é de R$ {0:.2f}".format(custo_empregador))
print("O salário líquido que o trabalhador irá receber no mês é R$ {0:.2f}".format(salario_liquido))

