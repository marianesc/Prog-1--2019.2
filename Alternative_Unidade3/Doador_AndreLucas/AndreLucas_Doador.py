# UFCG - Programação 1 - 2019.2
# André Lucas Medeiros Martins - 119210592
# Compatibiliade Sanguinea

tipoPaciente = input().upper()
fatorPaciente = input()

tipoDoador = input().upper()
fatorDoador = input()

resultado = "incompatível"

if tipoPaciente == "B" and (tipoDoador == "B" or tipoDoador == "O"):
    resultado="compatível"

elif tipoPaciente == "A" and (tipoDoador == "A" or tipoDoador == "O"):
    resultado = "compatível"

elif tipoPaciente == "O" and tipoDoador == "O":
    resultado = "compatível"

elif tipoPaciente == "AB" and (tipoDoador == "AB" or tipoDoador == "A" or tipoDoador == "B" or tipoDoador == "O"):
    resultado = "compatível"

if resultado == "compatível":
    if fatorPaciente == "-" and fatorDoador == "+":
        resultado = "incompatível"

print(resultado)
