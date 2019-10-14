import math

#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Cálculo da Hipotenusa

cateto1 = float(input("Medida do Cateto 1? "))
cateto2 = float(input("Medida do Cateto 2? "))

hipotenusa_q  = cateto1**2 + cateto2**2
hipotenusa = math.sqrt( hipotenusa_q)

print("Medida da Hipotenusa: %.2f"%hipotenusa)
