#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Salário

salario_bruto = float(input())
horas_de_trabalho = float(input())

ganhos_por_hora = salario_bruto / horas_de_trabalho
ir = salario_bruto*0.11
inss = salario_bruto*0.08
sindicato = salario_bruto*0.05
salario_liquido = salario_bruto-((ir)+(inss)+(sindicato))
hora_liquida = salario_liquido/ horas_de_trabalho

print("Salário Bruto = %.2f"%salario_bruto)
print("Hora Bruta = %.2f"%ganhos_por_hora)
print("Desconto IR = %.2f"%ir)
print("Desconto INSS = %.2f"%inss)
print("Desconto Sindicato = %.2f"%sindicato)
print("Salário Líquido = %.2f"%salario_liquido)
print("Hora Líquida = %.2f"%hora_liquida)




