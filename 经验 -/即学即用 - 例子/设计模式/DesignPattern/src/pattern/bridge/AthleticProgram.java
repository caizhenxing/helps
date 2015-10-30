package pattern.bridge;

import java.util.ArrayList;
import java.util.List;

public class AthleticProgram implements Program {

    List<String> content;

    AthleticProgram() {
        content = new ArrayList<String>();
    }

    @Override
    public List<String> makeTVProgram() {
        content.clear();
        content.add("巴西直播");
        content.add("巴西足球队进场");
        content.add("阿根廷足球队进场");
        content.add("巴西足球队进球");
        content.add("比赛结束");
        return content;
    }

}
