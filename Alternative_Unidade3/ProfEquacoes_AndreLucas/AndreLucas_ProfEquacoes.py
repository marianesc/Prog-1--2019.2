# UFCG - Programação 1 - 2019.2
# André Lucas Mederios Martins - 119210592
# Prof Equações

A = int(input())
B = int(input())
C = int(input())

delta = B**2 + -4*A*C

if delta < 0:
    print("sem raizes reais")
else:
    x1 = (-B + delta**0.5)/(2*A)
    x2 = (-B - delta**0.5)/(2*A)

    if x1 == x2:
        print("x = {:.2f}".format(x1))
    else:
        print("x1 = {:.2f}".format(x1))
        print("x2 = {:.2f}".format(x2))

