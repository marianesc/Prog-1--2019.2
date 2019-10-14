import math

#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Área do Cilindro
print("Cálculo da Superfície de um Cilindro")
print("---")

diametro = float(input("Medida do diâmetro? "))
altura = float(input("Medida da altura? "))

print("---")
area = 2*math.pi*(diametro/2)*(altura+(diametro/2))

print("Área calculada: %.2f"%area)


