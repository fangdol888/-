import sys
from PyQt5.QtWidgets import *
from PyQt5.QtGui import QIcon


class MyApp(QWidget):

    def __init__(self):
        super().__init__()
        self.initUI()

    def initUI(self):

        self.setWindowTitle('Pomodoro timer')
        self.setWindowIcon(QIcon('tomato.png'))
        self.resize(400, 300)
        self.te = QTextEdit()
        self.te.setAcceptRichText(False)
        vbox = QVBoxLayout()
        vbox.addWidget(self.te)
        self.setLayout(vbox)
        self.center()
        self.show()

    def center(self):
        qr = self.frameGeometry()
        cp = QDesktopWidget().availableGeometry().center()
        qr.moveCenter(cp)
        self.move(qr.topLeft())
if __name__ == '__main__':
   app = QApplication(sys.argv)
   ex = MyApp()
   sys.exit(app.exec_())
