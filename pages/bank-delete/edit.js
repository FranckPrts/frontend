import UpdateExperiment from '../../components/Experiment/Edit/index';
import { PageOnlyForScientists } from '../../components/Permissions/Scientist/index';
import Page from '../../components/Page/index';

const UpdateExperimentPage = ({ query }) => (
  <Page>
    <PageOnlyForScientists>
      <UpdateExperiment id={query.id} />
    </PageOnlyForScientists>
  </Page>
);

export default UpdateExperimentPage;
