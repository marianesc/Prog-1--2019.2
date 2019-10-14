#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Segundo Maior e Segundo Menor

num1 = int(input())
num2 = int(input())
num3 = int(input())
num4 = int(input())

print("Considerando os números {}, {}, {} e {}".format(num1,num2,num3,num4))

if num1 < num2 and num3 < num4 and num1 < num3:
    print("O segundo menor número é {}".format(num2))
elif num2 < num1 and num3 < num4 and num2 < num3:
    print("O segundo menor número é {}".format(num1))
elif num1 < num3 and num2 < num3 and num1 < num2:
    print("O segundo menor número é {}".format(num3))
elif num1 < num4 and num2 < num3 and num1 < num2:
    print("O segundo menor número é {}".format(num4))
if num1 > num2 and num3 > num4 and num1 > num3:
    print("O segundo maior número é {}".format(num2))
elif num2 > num1 and num3 > num4 and num2 > num3:
    print("O segundo maior número é {}".format(num1))
elif num1 > num4 and num2 > num3 and num1 > num2:
    print("O segundo maior número é {}".format(num3))
elif num1 > num4 and num2 > num3 and num1 > num2:
    print("O segundo maior número é {}".format(num4))

