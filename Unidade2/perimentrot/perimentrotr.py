#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Perímetro de um Triângulo

xa= int(input())
ya= int(input())
xb= int(input())
yb= int(input())
xc= int(input())
yc= int(input())

ab = (((xa-xb)**2)+((ya-yb)**2))**(1/2)
ac =  (((xa-xc)**2)+((ya-yc)**2))**(1/2)
bc =  (((xb-xc)**2)+((yb-yc)**2))**(1/2)

perimetro = ab+ac+bc

print("O perímetro é de {0:.2f}".format(perimetro))
