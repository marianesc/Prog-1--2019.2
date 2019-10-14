import math
#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Quadrado na Circunferência

lado = float(input())

raio = ((lado**2+lado**2)**(1/2))/2
perimetro = 2 * math.pi * raio
area = math.pi * raio**2 

print("Perímetro: %.5f"%(perimetro))
print("Área: %.5f"%(area))
