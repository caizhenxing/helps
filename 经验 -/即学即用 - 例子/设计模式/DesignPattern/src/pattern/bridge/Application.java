package pattern.bridge;

import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;

/**
 * 桥接模式<br>
 * 抽象部分和实现部分分离，使它们都可以独立地变化<br>
 * 四个角色: <br>
 * 抽象，细化抽象，实现者和具体实现者
 * 
 * @author carlcyang
 *
 */
public class Application extends JFrame {

    private static final long serialVersionUID = 1L;

    JButton seeProgram;

    CCTV cctv;
    Program program;

    Application(final CCTV cctv, Program program) {
        this.cctv = cctv;
        this.program = program;
        add(cctv, BorderLayout.CENTER);
        seeProgram = new JButton("看节目");
        add(seeProgram, BorderLayout.SOUTH);
        seeProgram.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent actionevent) {
                cctv.makeProgram();
            }

        });
        setVisible(true);
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    }

    public static void main(String[] args) {
        Program program = new AthleticProgram();
        CCTV cctv = new CCTV5(program);
        Application application1 = new Application(cctv, program);
        application1.setBounds(10, 10, 200, 300);
        program = new FilmProgram();
        cctv = new CCTV6(program);
        Application application2 = new Application(cctv, program);
        application2.setBounds(220, 10, 200, 300);
    }
}
