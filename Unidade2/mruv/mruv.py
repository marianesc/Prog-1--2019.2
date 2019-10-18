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
print("   Posição inicial: {0:.2f}".format(s0))
print("Velocidade inicial: {0:.2f} m/s".format(v0))
print("        Aceleração: {0:.2f} m/s2".format(a))
print("             Tempo: {0:.2f} s".format(t))
print("  Velocidade final: {0:.2f} m/s".format(v))
print("  Velocidade média: {0:.2f} m/s".format(vm))
print("     Posição final: {0:.2f} m".format(s))
