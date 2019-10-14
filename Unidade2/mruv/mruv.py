#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Movimento Uniformemente Variado

s0 = float(input("Posição inicial? "))
v0 = float(input("Velocidade inicial? "))
t = float(input("Tempo? "))
a  = float(input("Aceleração? "))

v = v0 +(a*t)
s = s0 + (v0*t) +(a*t**2)/2
vm = v0 + (a*t)/2

print("")
print("Dados da questão")
print("================")
print("   Posição inicial: %.2f m"%s0)
print("Velocidade inicial: %.2f m/s"%v0)
print("        Aceleração: %.2f m/s2"%a)
print("             Tempo: %.2f s"%t)
print("  Velocidade final: %.2f m/s"%v)
print("  Velocidade média: %.2f m/s"%vm)
print("     Posição final: %.2f m"%s)

