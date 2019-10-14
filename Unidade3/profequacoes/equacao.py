#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Corrigindo Equações


a = int(input())
b = int(input())
c = int(input())

delta = b**2 - (4*a*c)

x1 = ((-b) + (delta ** 0.5)) / (2*a)
x2 = ((-b) - (delta ** 0.5)) / (2*a)

if delta < 0:
    print("sem raizes reais")
elif x1 == x2:
    print("x = %.2f" % x1)
else:
    print("x1 = %.2f" % x1)
    print("x2 = %.2f" % x2)
