#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Lucro Mensal de uma Empresa

meses = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']
lucro = []
for mes in range(len(meses)):
    receita, despesa = input().split()
    receita = float(receita)
    despesa = float(despesa)
    din = receita-despesa
    lucro.append(din)
for mes in range(len(meses)):
    print("{} {:>4.1f}".format(meses[mes],lucro[mes]))
