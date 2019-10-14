import math

#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Quadrado na Circunferência

raio = float(input())

area_circulo = math.pi* raio**2
area_quadrado = 2*raio**2 
dif = area_circulo-area_quadrado

print("Área não comum: %.5f"%dif)
