# UFCG - Programação 1 - 2019.2
# André Lucas Medeiros Martins - 119210592
# Com ou Sem Duplicados

resultado = "sem duplicados"

numero1 = int(input())

numero2 = int(input())

if numero1 == numero2:
    resultado = "com duplicados"

numero3 = int(input())

if numero3 == numero1 or numero3 == numero2:
    resultado = "com duplicados"

numero4 = int(input())

if numero4 == numero1 or numero4 == numero2 or numero4 == numero3:
    resultado = "com duplicados"

numero5 = int(input())

if numero5 == numero1 or numero5 == numero2 or numero5 == numero3 or numero5 == numero4:
    resultado = "com duplicados"

print(resultado)

