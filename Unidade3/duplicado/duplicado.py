#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Com ou Sem Duplicados

num1 = int(input())
num2 = int(input())
num3 = int(input())
num4 = int(input())
num5 = int(input())

if num1 != num2 and num1 != num3 and num1 != num4 and num1 != num5 and num2 != num3 and num2 != num4 and num2 != num5 and num3 != num4 and num3 != num5 and num4 != num5:
    print("sem duplicados")
else:
    print("com duplicados")
