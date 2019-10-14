import math

#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Controle de Água

velocidade_de_vazao = float(input())
diametro = float(input())
tempo = int(input())

seccao = math.pi * (diametro/2) ** 2
vazao = velocidade_de_vazao * seccao * 1000
quantidade_de_agua = (tempo * vazao)

print ("Quantidade de água = {:.2f} litros.".format(quantidade_de_agua))

