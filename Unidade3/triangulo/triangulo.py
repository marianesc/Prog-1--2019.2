#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Validação de Triângulos

a = int(input())
b = int(input())
c = int(input())

if abs(b-c)<a<b+c:
    perimetro = a+b+c
    print("triangulo valido. {0}".format(perimetro))
elif abs(a-c)<b<a+c:
    perimetro = a+b+c
    print("triangulo valido. {0}".format(perimetro))
elif abs(a-b)<c<a+b:
    perimetro = a+b+c
    print("triangulo valido. {0}".format(perimetro))
else:
    print("triangulo invalido.")
