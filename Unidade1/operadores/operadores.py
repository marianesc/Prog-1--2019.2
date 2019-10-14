#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Operadores

a = int(input())
b = int(input())

soma  = a + b
subtracao = a - b
multiplicacao = a * b
divisao = a / b
resto = a % b
exponenciacao = a**b
negacao_a = a*-1
a_igual_b = bool(a==b)
a_diferente_b = bool(a!=b)
a_maior_b = bool(a>b)
b_maior_a = bool(b>a)
a_menor_igual_b = bool(a<=b)

print("===== Operadores =====")
print("A =",a)
print("B =",b)
print("Adição =",soma)
print("Subtração =",subtracao)
print("Multiplicação =",multiplicacao)
print("Divisão = %.0f"%divisao)
print("Resto =",resto)
print("Exponenciação =",exponenciacao)
print("Negação de A =",negacao_a)
print("A é igual a B?",a_igual_b)
print("A é diferente de B?",a_diferente_b)
print("A é maior que B?",a_maior_b)
print("B é maior que A?",b_maior_a)
print("A é menor ou igual a B?",a_menor_igual_b)
