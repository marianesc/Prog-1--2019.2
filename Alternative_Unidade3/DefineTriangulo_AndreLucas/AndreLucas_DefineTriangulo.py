# UFCG - Programação 1 -2019.2
# André Lucas Medeiros Martins - 119210592
# É Triangulo

lados = []

resultado = "triangulo valido."

for vez in range(3):
    lados.append(int(input()))

for lado in range(len(lados)):
    if lado == 0:
        soma = lados[1] + lados[2]
        diferenca = lados[1] - lados[2]
    
    elif lado == 1:
        soma = lados[0] + lados[2]
        diferenca = lados[0] - lados[2]

    elif lado == 2:
        soma = lados[0] + lados[1]
        diferenca = lados[0] - lados[1]

    if diferenca < 0:
        diferenca *= -1

    if lados[lado] > soma or lados[lado] < diferenca:
        resultado = "triangulo invalido."
        break


if resultado == "triangulo valido.":
    perimetro = lados[0] + lados[1] + lados[2]
    print(resultado, perimetro)

else:
    print(resultado)
