import unittest
import sys

undertest = __import__(sys.argv[-1].split(".py")[0])
troca_chave = getattr(undertest, 'troca_chave', None)

class AcceptanceTests(unittest.TestCase):

    def test_example(self):
        assert troca_chave({1:2}) == {2:1}
        assert troca_chave({1:2, 2:3, 3:4}) == {2:1, 3:2, 4:3}
        assert troca_chave({ '@':'V','a':'v', 'n':'o'}) == { 'V':'@','v':'a', 'o':'n'}

if __name__ == '__main__':
    loader = unittest.TestLoader()
    runner = unittest.TextTestRunner()
    runner.run(loader.loadTestsFromModule(sys.modules[__name__]))
