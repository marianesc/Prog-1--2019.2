#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Calcula ingressos do cinema

adulto = int(input())
crianca = int(input())
preco = float(input())

preco_total = (adulto * preco) + (crianca*(preco/2))

print("Total: R$ %.2f" % preco_total)
