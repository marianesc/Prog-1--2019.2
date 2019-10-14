#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Calcula despesas do cinema

orcamento = float(input("Orçamento? R$ "))
num_adultos = int(input("Número de adultos? "))
num_criancas = int(input("Número de crianças? "))
pizza = float(input("Preço da pizza? R$ "))
refrigerante = float(input("Preço do refrigerante? R$ "))
estacionamento = float(input("Preço do estacionamento? R$ "))
ingresso = float(input("Preço do ingresso do cinema? R$ "))

alimentacao = pizza + refrigerante
adultos = num_adultos * (ingresso + 2)
criancas = num_criancas * ((ingresso/ 2)+2)
cinema = adultos + criancas
por_pessoa = (cinema + alimentacao + estacionamento) /(num_adultos +num_criancas)
total = alimentacao + cinema + estacionamento
saldo = orcamento - total

print("========== Despesas do cinema ==========")
print("Alimentacao: R$ %.2f" % alimentacao)
print("Cinema: R$ %.2f" % cinema)
print("Custo médio por pessoa: R$ %.2f" % por_pessoa)
print("Total: %.2f"%total)
print("Saldo após passeio: %.2f" % saldo)

