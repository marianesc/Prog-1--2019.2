# UFCG - Programação 1 - 2019.2
# Anré Lucas Medeiros Martins- 119210592

# Custo Empregado

salarioBase = float(input())
diasTrabalhados = int(input())
valorTransporte = float(input())

salarioLiquido = salarioBase

INSSempregador = salarioBase * 0.12
FGTSempregador = salarioBase * 0.08

custoEmpregador = salarioBase + INSSempregador + FGTSempregador

totalTransporte = diasTrabalhados * valorTransporte

if (totalTransporte > 0.06 * salarioBase):
    salarioLiquido -= salarioBase * 0.06
    custoEmpregador += totalTransporte - 0.06 * salarioBase

if (salarioBase <= 1317.07):
    INSSempregado = salarioBase *  0.08
elif (salarioBase > 1317.08 and salarioBase <= 2195.12):
    INSSempregado = salarioBase * 0.09
else:
    INSSempregado = salarioBase * 0.11

salarioLiquido -= INSSempregado

print("O salário base é R$ {:.2f}".format(salarioBase))
print("O custo mensal para o empregador é de R$ {:.2f}".format(custoEmpregador))
print("O salário líquido que o trabalhador irá receber no mês é R$ {:.2f}".format(salarioLiquido))
